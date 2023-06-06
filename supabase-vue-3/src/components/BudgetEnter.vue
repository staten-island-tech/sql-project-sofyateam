<template>
  <div>
    <h1>kadgglos</h1>
    <form @submit.prevent="updateClear">
      <label for="amount">Amount:</label>
      <input type="number" id="amount" v-model="amount" required />
      <button type="submit">Submit</button>
    </form>
    <p>Total Spending: {{ totalSpending }}</p>
    <ul>
      <li v-for="item in budgetItems" :key="item.id">
        <input
          v-if="editingItemId === item.id"
          type="number"
          v-model="editedAmount"
          required
        />
        <span v-else>{{ item.amount }}</span>
        <button @click="deleteBudget(item.id)">Delete</button>
        <button @click="startEditing(item.id)" v-if="!editingItemId">
          Edit
        </button>
        <button @click="updateBudget(item.id)" v-if="editingItemId === item.id">
          Update
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import { defineProps } from "vue";

const props = defineProps(["session"]);
const { session } = toRefs(props);

const amount = ref("");
const totalSpending = ref(0);
const budgetItems = ref([]);
const editingItemId = ref(null);
const editedAmount = ref("");

onMounted(async () => {
  await getBudget();
});

async function updateProfile() {
  try {
    const { user } = session.value;
    const updates = {
      user_id: user.id,
      date_added: new Date(),
      amount: Number(amount.value),
    };
    let { error } = await supabase.from("budgets").upsert(updates);

    if (error) throw error;
  } catch (error) {
    alert(error.message);
  }
}

async function getBudget() {
  try {
    const { user } = session.value;

    let { data, error } = await supabase
      .from("budgets")
      .select("*")
      .eq("user_id", user.id);

    if (error) throw error;

    budgetItems.value = data;
    totalSpending.value = data.reduce((total, item) => total + item.amount, 0);
  } catch (error) {
    alert(error.message);
  }
}

async function clearInput() {
  amount.value = "";
}

async function updateClear() {
  await updateProfile();
  await clearInput();
  getBudget();
}

async function deleteBudget(itemId) {
  try {
    const { error } = await supabase.from("budgets").delete().eq("id", itemId);

    if (error) throw error;

    await getBudget();
  } catch (error) {
    alert(error.message);
  }
}

function startEditing(itemId) {
  editingItemId.value = itemId;
  const item = budgetItems.value.find((budgetItem) => budgetItem.id === itemId);
  editedAmount.value = item.amount.toString();
}

async function updateBudget(itemId) {
  try {
    const newAmount = Number(editedAmount.value);
    const { error } = await supabase
      .from("budgets")
      .update({ amount: newAmount })
      .eq("id", itemId);

    if (error) throw error;

    editingItemId.value = null;
    await getBudget();
  } catch (error) {
    alert(error.message);
  }
}
</script>

<style scoped>
<style scoped > .container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

form {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

input[type="number"] {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

button[type="submit"] {
  background-color: #28a745;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

li span {
  flex-grow: 1;
}

li input[type="number"] {
  flex-grow: 1;
  margin-right: 10px;
}

li button {
  margin-left: 10px;
}
</style>
