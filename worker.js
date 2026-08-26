export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== "/api/remove-bg") {
      return new Response("Not found", { status: 404 });
    }

    if (request.method !== "POST") {
      return new Response("POST required", { status: 405 });
    }

    if (!env.REMOVE_BG_API_KEY) {
      return new Response("Server is not configured.", { status: 500 });
    }

    const incoming = await request.formData();
    const image = incoming.get("image");

    if (!(image instanceof File)) {
      return new Response("Image file is required.", { status: 400 });
    }

    const form = new FormData();
    form.append("image_file", image, image.name || "image.jpg");
    form.append("size", "auto");

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "YsHqfuwV5d37uQxK9dCbfdVn": env.REMOVE_BG_API_KEY
      },
      body: form
    });

    const body = await response.arrayBuffer();

    return new Response(body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/octet-stream",
        "Cache-Control": "no-store"
      }
    });
  }
};
