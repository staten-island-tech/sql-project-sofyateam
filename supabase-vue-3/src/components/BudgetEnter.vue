<template>
  <div>
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
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}
a:hover {
  color: #535bf2;
}
a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}
body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}
h1 {
  font-size: 3.2em;
  line-height: 1.1;
}
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
.card {
  padding: 2em;
}
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
</style>
