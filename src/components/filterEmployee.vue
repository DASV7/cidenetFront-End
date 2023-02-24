<style >
.filterEmployee {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.filterEmployee__item {
    display: flex;
    flex-direction: column;
    white-space: nowrap;

    border-bottom: 1px solid #000000;
    text-align: start;
    font-weight: bold;
    gap: 0;
}

.filterEmployee__input {
    height: 30px;
    border: none;
    border-radius: 5px;
    outline: none;
}

.filterEmployee__options {
    display: flex;
    flex-wrap: wrap;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1rem;

}

.filterEmployee__button {
    background-color: #0079ff;
    height: 30px;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 5px;
}

.filterEmployee__filter {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<template>
    <div class="filterEmployee">
        <form id="filterData" @submit="validateInformation($event)" class="filterEmployee__options">
            <div class="filterEmployee__item">
                <label for="firstName">Primer Nombre:</label>
                <input class="filterEmployee__input" name="first_name" type="text" id="firstName">
            </div>
            <div class="filterEmployee__item">
                <label for="otherNames">Otros Nombres:</label>
                <input class="filterEmployee__input" type="text" name="second_name" id="otherNames">
            </div>
            <div class="filterEmployee__item">
                <label for="lastName">Primer Apellido:</label>
                <input class="filterEmployee__input " type="text" name="surname" id="lastName">
            </div>
            <div class="filterEmployee__item">
                <label for="secondSurname">Segundo Apellido:</label>
                <input class="filterEmployee__input" type="text" name="second_Surname" id="secondSurname">
            </div>
            <div class="filterEmployee__item">
                <label for="typeDocument">Tipo de Identificación:</label>
                <select class="filterEmployee__input" id="typeDocument" name="type_document">
                    <option selected value="">Seleccione un tipo DCTO</option>
                    <option v-for="item in typeDocuments" :key="item">{{ item }}</option>
                </select>
            </div>
            <div class="filterEmployee__item">
                <label for="document">Numero de Documento:</label>
                <input class="filterEmployee__input" type="number" name="number_document" id="document">
            </div>
            <div class="filterEmployee__item">
                <label for="country">Pais:</label>
                <select class="modalWithInfo_input" id="country" name="country">
                    <option selected value="">Seleccione un Pais</option>
                    <option v-for="item in country" :key="item" :value="item">{{ item }}</option>
                </select>
            </div>
            <div class="filterEmployee__item">
                <label for="email">Email:</label>
                <input class="filterEmployee__input" type="text" name="email" id="email">
            </div>         
            <div class="filterEmployee__filter">
                <button class="filterEmployee__button" type="submit" @click="validateInformation()">
                    Filtrar
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
        </form>
    </div>
</template>
  
<script>

export default {
    props: ["country"],
    name: 'filterComponent',
    data() {
        return {
            typeDocuments: [
                "Cédula de Ciudadanía",
                "Cédula de Extranjería",
                "Pasaporte",
                "Tarjeta de Identidad"
            ],
            allCountry: []
        }
    },
    methods: {
        validateInformation() {
            event.preventDefault();
            const form = document.getElementById('filterData');
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            let filter = false
            Object.keys(data).forEach(key => { if (data[key]) filter = true })
            if (filter) this.$emit("filterInformation", data)
        }
    }
}
</script>
  