
export async function uploadForm({ url, e }: { url: string; e: HTMLFormElement }) {
  const urlFetch = url.startsWith("/api/")
  ? url: url.startsWith("/")? "/api" + url: "/api/" + url;
  const formData = new FormData(e);
  // console.log(formData,"uploadForm")
  const response = await fetch(urlFetch, {
    method: "POST",
    body: formData,
  });
  return response.json();
}