export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS
    const corsHeaders = {
      "Access-Control-Allow-Origin": "https://ahmadalisamb.pages.dev",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400"
    };

    // Handle CORS preflight request
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    // Only allow the Remove BG endpoint
    if (url.pathname !== "/api/remove-bg") {
      return new Response("Not found.", {
        status: 404,
        headers: corsHeaders
      });
    }

    // Only POST is allowed
    if (request.method !== "POST") {
      return new Response("POST required.", {
        status: 405,
        headers: corsHeaders
      });
    }

    // Check API key
    if (!env.REMOVE_BG_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "Server is not configured. REMOVE_BG_API_KEY is missing."
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        }
      );
    }

    try {
      // Read uploaded image
      const incoming = await request.formData();
      const image = incoming.get("image");

      if (!(image instanceof File)) {
        return new Response(
          JSON.stringify({
            error: "Image file is required."
          }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json"
            }
          }
        );
      }

      // Prepare request for Remove.bg
      const form = new FormData();

      form.append(
        "image_file",
        image,
        image.name || "image.jpg"
      );

      form.append("size", "auto");

      // Send image to Remove.bg
      const response = await fetch(
        "https://api.remove.bg/v1.0/removebg",
        {
          method: "POST",
          headers: {
            "X-Api-Key": env.REMOVE_BG_API_KEY
          },
          body: form
        }
      );

      // Get response body
      const body = await response.arrayBuffer();

      // Return Remove.bg response to website
      return new Response(body, {
        status: response.status,
        headers: {
          ...corsHeaders,
          "Content-Type":
            response.headers.get("Content-Type") ||
            "application/octet-stream",
          "Cache-Control": "no-store"
        }
      });

    } catch (error) {
      return new Response(
        JSON.stringify({
          error: "Background removal failed.",
          message: error instanceof Error
            ? error.message
            : String(error)
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        }
      );
    }
  }
};
