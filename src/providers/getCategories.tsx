import api from "@/tools/api";

export default function getCategories() {
  const response = api
    .get("/categoria/get-all", {
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
