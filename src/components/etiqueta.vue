<script setup lang="ts">
import { ref } from 'vue'

const produto = ref('')
const preco = ref('')
const quantidade = ref('')
const etiquetas = ref([])

const gerarEtiquetas = () => {
    etiquetas.value = Array(Number(quantidade.value)).fill().map(() => ({
        produto: produto.value,
        preco: preco.value
    }))
}

const imprimirEtiquetas = () => {
    window.print()
}
</script>

<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Sistema de Impressão de Etiquetas</h1>

        <form @submit.prevent="gerarEtiquetas" class="mb-8 space-y-4">
            <div>
                <label for="produto" class="block text-sm font-medium text-gray-700">Nome do Produto</label>
                <input id="produto" v-model="produto" required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <div>
                <label for="preco" class="block text-sm font-medium text-gray-700">Preço</label>
                <input id="preco" v-model="preco" required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <div>
                <label for="quantidade" class="block text-sm font-medium text-gray-700">Quantidade de Etiquetas</label>
                <input id="quantidade" v-model="quantidade" type="number" required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Gerar Etiquetas
            </button>
        </form>

        <div v-if="etiquetas.length > 0">
            <button @click="imprimirEtiquetas"
                class="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Imprimir Etiquetas
            </button>
            <div class="grid grid-cols-2 gap-1 print:gap-0">
                <div v-for="(etiqueta, index) in etiquetas" :key="index"
                    class="border border-dashed border-gray-300 p-2 print:border-black"
                    style="width: 4cm; height: 2cm;">
                    <div class="text-xs font-bold">{{ etiqueta.produto }}</div>
                    <div class="text-xs">Preço: {{ etiqueta.preco }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media print {
    @page {
        size: auto;
        margin: 0mm;
    }

    body {
        margin: 0;
        padding: 0;
    }

    .container {
        width: 100%;
        max-width: none;
    }

    form,
    h1,
    button {
        display: none;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, 4cm);
        gap: 0;
    }

    .grid>div {
        page-break-inside: avoid;
        break-inside: avoid;
    }
}
</style>
