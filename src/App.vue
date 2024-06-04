<template>
  <v-app theme="light">
    <v-main>
      <v-container class="d-flex align-center justify-center">
        <v-form @submit.prevent="submitForm" class="max-w-xl">
          <v-text-field
            v-model="email"
            label="Email"
            class="w-100"
          ></v-text-field>
          <v-text-field
            v-model="name"
            label="Nome"
            class="w-100"
          ></v-text-field>
          <v-btn type="submit" color="primary">Adicionar Tarefa</v-btn>
        </v-form>
      </v-container>
      <div
        class="container-fluid d-flex justify-content-center align-items-center"
      >
        <div class="max-w-xl mx-auto">
          <v-card
            class="d-flex align-items-center px-5"
            v-for="item in data"
            :key="item.id"
          >
            <v-card-item>
              <v-icon @click="patchData(item.id, item.completed)" size="large"
                >mdi-check-circle</v-icon
              >
              {{ item.name }}
            </v-card-item>
            <v-icon @click="DeleteData(item.id)" class="mt-2" size="large"
              >mdi-delete</v-icon
            >
          </v-card>
        </div>
      </div>
      <div class="mx-auto max-w-xl text-center">
        <pre>{{ data }}</pre>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { deleteData, getData, postData, updateData } from "@/services/api/todo";

const data = ref([]);
const email = ref("");
const name = ref("");

onMounted(async () => {
  fetchData();
});

const fetchData = async () => {
  data.value = await getData();
};

const submitForm = async () => {
  await postData(email.value, name.value);
  fetchData();
  email.value = "";
  name.value = "";
};

const patchData = async (id, completed) => {
  const setState = !completed;
  await updateData(id, { completed: setState });
  fetchData(); // Atualiza os dados após a atualização
};

const DeleteData = async (id) => {
  await deleteData(id);
  fetchData(); // Atualiza os dados após a exclusão
};
</script>
