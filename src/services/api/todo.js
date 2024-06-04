import axios from "axios";
export async function getData() {
  const response = await axios.get("todos");

  console.log(response.headers);
  console.log(response.request);

  return response.data;
}

export async function postData(email, name) {
  const response = await axios.post("todos", { email, name });
  console.log("Dados Registrados", response.data);

  return response.data;
}

export async function updateData(id, newData) {
  const response = await axios.patch(`todos/${id}`, newData);
  console.log("logando a cu", response.data);

  return response.data;
}

export async function deleteData(id) {
  const response = await axios.delete(`todos/${id}`);

  return response.data;
}
