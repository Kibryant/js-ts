"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addTask(formData: FormData) {
    await prisma.task.create({
        data: {
            title: formData.get("title") as string,
            completed: false,
        },
    });

    revalidatePath("/");
}

export async function removeTask(formData: FormData) {
    await prisma.task.delete({
        where: {
            id: formData.get("id") as string,
        },
    });

    revalidatePath("/");
}

export async function completedTask(formData: FormData) {
    await prisma.task.update({
        where: {
            id: formData.get("id") as string,
        },
        data: {
            completed: true,
        },
    });

    revalidatePath("/");
}