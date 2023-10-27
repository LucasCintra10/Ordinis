import api from "@/tools/api";

export default function getLocations() {
  const response = api
    .get("/localizacao/get-all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response: any) => {
      return response.data.data;
    })
    .catch((error: any) => {
      console.log(error);
    });
  return response;
}
