<template>
  <div class="flex flex-col items-center justify-center gap-4 h-screen">
    <h1 class="font-bold text-2xl text-(--ui-primary)">
      TODO LIST APP by Muhammad Rizky Safdila
    </h1>

    <div class="flex items-center gap-2">
      <UButton
        label="Checklists"
        icon="lucide:list-checks"
        to="/checklists"
      />

      <UButton
        label="GitHub"
        color="neutral"
        variant="outline"
        icon="i-simple-icons-github"
        to="https://github.com/rizkysafdila/todolist-app"
        target="_blank"
      />
    </div>
  </div>
</template>
