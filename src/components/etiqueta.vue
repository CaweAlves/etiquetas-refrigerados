<script setup lang="ts">
import { ref, computed } from "vue";

interface Etiqueta {
  produto: string;
  preco: string;
  quantidade: number;
}

const etiquetas = ref<Etiqueta[]>([]);
const novaEtiqueta = ref({
  produto: "",
  preco: "",
  quantidade: 1,
});

const adicionarEtiqueta = () => {
  const { produto, preco, quantidade } = novaEtiqueta.value;
  for (let i = 0; i < quantidade; i++) {
    etiquetas.value.push({ produto, preco, quantidade: 1 });
  }
  novaEtiqueta.value = { produto: "", preco: "", quantidade: 1 };
};

const limparEtiquetas = () => {
  etiquetas.value = [];
};

const imprimirEtiquetas = () => {
  window.print();
};

const totalEtiquetas = computed(() => {
  return etiquetas.value.reduce((total, etiqueta) => total + etiqueta.quantidade, 0);
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-gray-900">
          Sistema de Impressão de Etiquetas
        </h1>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div class="space-y-6">
              <h2 class="text-lg leading-6 font-medium text-gray-900">
                Informações da Etiqueta
              </h2>
              <form @submit.prevent="adicionarEtiqueta" class="space-y-4">
                <div>
                  <label for="produto" class="block text-sm font-medium text-gray-700">Nome do Produto</label>
                  <input type="text" id="produto" v-model="novaEtiqueta.produto" required
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                  <label for="preco" class="block text-sm font-medium text-gray-700">Preço</label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span class="text-gray-500 sm:text-sm">R$</span>
                    </div>
                    <input type="text" id="preco" v-model="novaEtiqueta.preco" step="0.01" required
                      class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
                <div>
                  <label for="quantidade" class="block text-sm font-medium text-gray-700">Quantidade</label>
                  <input type="number" id="quantidade" v-model="novaEtiqueta.quantidade" min="1" required
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                  <button type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Adicionar Etiqueta
                  </button>
                </div>
              </form>
            </div>

            <div class="space-y-6">
              <h2 class="text-lg leading-6 font-medium text-gray-900">
                Visualização das Etiquetas
              </h2>
              <div class="bg-gray-50 p-4 rounded-md overflow-auto max-h-96 print:max-h-screen">
                <div class="grid grid-cols-4 gap-1">
                  <div v-for="(etiqueta, index) in etiquetas" :key="index" :class="[
                    'border-2 border-dashed border-gray-300 p-2 rounded-md print:rounded-none shadow-sm hover:shadow-md transition',
                  ]" style="width: 4cm; height: 2cm">
                    <div class="text-xs font-bold truncate">{{ etiqueta.produto }}</div>
                    <div class="text-xs">Preço: R$ {{ etiqueta.preco }}</div>
                  </div>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <button @click="limparEtiquetas"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Limpar Todas
                </button>
                <span class="font-semibold">Total de Etiquetas: {{ totalEtiquetas }}</span>
                <button @click="imprimirEtiquetas" :disabled="etiquetas.length === 0"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
                  Imprimir Etiquetas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
@media print {
  body * {
    visibility: hidden;
  }

  .bg-gray-50,
  .bg-gray-50 * {
    visibility: visible;
  }

  .bg-gray-50 {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }

  .grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fill, 4cm) !important;
    gap: 0 !important;
  }

  .grid>div {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    margin: 0 !important;
    padding: 2mm !important;
    border: 1px dashed black !important;
    width: 4cm !important;
    height: 2cm !important;
    box-sizing: border-box !important;
  }
}
</style>
