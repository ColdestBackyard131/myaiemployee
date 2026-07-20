import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// ─── TASKS ───────────────────────────────────────────────
export async function addTask(userId: string, task: { text: string; priority: string; date: string }) {
  return await addDoc(collection(db, "tasks"), {
    ...task,
    userId,
    done: false,
    createdAt: serverTimestamp(),
  });
}

export async function getTasks(userId: string) {
  const q = query(collection(db, "tasks"), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function updateTask(taskId: string, data: object) {
  await updateDoc(doc(db, "tasks", taskId), data);
}

export async function deleteTask(taskId: string) {
  await deleteDoc(doc(db, "tasks", taskId));
}

// ─── CHAT HISTORY ────────────────────────────────────────
export async function saveChat(userId: string, message: { role: string; content: string }) {
  return await addDoc(collection(db, "chats"), {
    ...message,
    userId,
    createdAt: serverTimestamp(),
  });
}

export async function getChats(userId: string) {
  const q = query(collection(db, "chats"), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function clearChats(userId: string) {
  const q = query(collection(db, "chats"), where("userId", "==", userId));
  const snap = await getDocs(q);
  await Promise.all(snap.docs.map((d) => deleteDoc(doc(db, "chats", d.id))));
}

// ─── PROJECTS ────────────────────────────────────────────
export async function addProject(userId: string, project: { name: string; desc: string; color: string }) {
  return await addDoc(collection(db, "projects"), {
    ...project,
    userId,
    createdAt: serverTimestamp(),
  });
}

export async function getProjects(userId: string) {
  const q = query(collection(db, "projects"), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function deleteProject(projectId: string) {
  await deleteDoc(doc(db, "projects", projectId));
}
