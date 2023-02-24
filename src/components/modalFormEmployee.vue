<style>
@import '@/assets/scss/toogle.scss';

.modalWithInfo {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.144);
}

.modalWithInfo__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
}

.modalWithInfo__container {
    width: auto;
    height: auto;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
}

.modalWithInfo__content {
    display: flex;
    flex-direction: column;
    min-width: 350px;
    padding: 15px;
    border-left: 15px solid #E1EFF8;
    border-right: #2C3E50 15px solid;
}

.modalWithInfo__item {
    border-bottom: 1px solid #000000;
    text-align: start;
    font-weight: bold;
    gap: 0;
    margin-bottom: 5px;
}

.modalWithInfo_input {
    height: 35px;
    width: 100%;
    border-radius: 5px;
    border: none;
    outline: none;

}

.modalWithInfo__close {
    background-color: transparent;
    font-weight: 900;
    border: none;
    font-size: 20px;
    text-align: end;
    cursor: pointer;
}

.modalWithInfo__close:hover {
    color: red;
}

.modalWithInfo__title {
    margin: 0 0 10px 0;
    font-size: 25px;
}

.modalWithInfo__buttonSave {
    background-color: #0079ff;
    width: 100%;
    height: 30px;
    border: none;
    border-radius: 5px;
    color: white;
    font-weight: 600;
    font-size: 20px;
    cursor: pointer;
}
</style>

<template>
    <div class="modalWithInfo fadeInUp" v-if="showModal">
        <div class="modalWithInfo__wrapper">
            <div class="modalWithInfo__container">
                <div class="modalWithInfo__content">
                    <button class="modalWithInfo__close" @click="closeModal()"><i class="fa-solid fa-x"></i></button>
                    <p class="modalWithInfo__title">{{ action == 'edit' ? "Edicion de " : "Creacion de " }} Usuario</p>
                    <div class="modalWithInfo__item">
                        <label for="firstName">Primer Nombre:</label>
                        <input maxlength="20" @input="validNameOnlyAZ('firstName')" class="modalWithInfo_input"
                            v-model="information.first_name" name="firstName" type="text" id="firstName">
                    </div>
                    <div class="modalWithInfo__item">
                        <label for="otherNames">Otros Nombres:</label>
                        <input maxlength="50" class="modalWithInfo_input" v-model="information.second_name" type="text"
                            name="otherNames" id="otherNames">
                    </div>
                    <div class="modalWithInfo__item">
                        <label for="lastName">Primer Apellido:</label>
                        <input maxlength="20" class="modalWithInfo_input" v-model="information.surname" type="text"
                            name="lastName" id="lastName">
                    </div>
                    <div class="modalWithInfo__item">
                        <label for="secondSurname">Segundo Apellido:</label>
                        <input class="modalWithInfo_input" v-model="information.second_Surname" type="text"
                            name="secondSurname" id="secondSurname">
                    </div>
                    <div class="modalWithInfo__item">
                        <label for="typeDocument">Tipo de Identificación:</label>
                        <select class="modalWithInfo_input" v-model="information.type_document" id="typeDocument"
                            name="typeDocument">
                            <option selected value="">Seleccione un tipo de Documento</option>
                            <option v-for="item in typeDocuments" :key="item" :value="item">{{ item }}</option>
                        </select>
                    </div>
                    <div class="modalWithInfo__item">
                        <label for="document">Numero de Documento:</label>
                        <input class="modalWithInfo_input" v-model="information.number_document" type="text" name="document"
                            id="document">
                    </div>
                    <div class="modalWithInfo__item">
                        <label for="country">Pais:</label>
                        <select class="modalWithInfo_input" v-model="information.country" id="country" name="country">
                            <option selected value="">Seleccione un Pais</option>
                            <option v-for="item in country" :key="item" :value="item">{{ item }}</option>
                        </select>
                    </div>
                    <div class="modalWithInfo__item">
                        <label for="country">Area:</label>
                        <select class="modalWithInfo_input" v-model="information.area" id="country" name="country">
                            <option selected value="">Seleccione un Area</option>
                            <option v-for="item in area" :key="item" :value="item">{{ item }}</option>
                        </select>
                    </div>
                    <div class="modalWithInfo__item" v-if="action == 'edit'">
                        <label for="email">Email:</label>
                        <input disabled class="modalWithInfo_input" v-model="information.email" type="text" name="email"
                            id="email">
                    </div>
                    <div class="modalWithInfo__item">
                        <label for="status">Estado: </label>

                        <label class="switch">
                            <input disabled v-model="information.status" type="checkbox">
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div>
                        <button class="modalWithInfo__buttonSave" type="submit" @click="validateInformation($event)">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'modalFormEmployeeVue',
    props: ["showModal", "informationModal", "action", "allCountry"],
    data() {
        return {
            information: {},
            typeDocuments: [
                "Cédula de Ciudadanía",
                "Cédula de Extranjería",
                "Pasaporte",
                "Tarjeta de Identidad"
            ],
            country: [],
            area: ["Contabilidad", "Tecnologia", "Recursos Humanos", "Servicio al cliente", "Inventarios"],
            regionName: ""

        }
    },
    computed: {
    },
    methods: {
        closeModal() {
            this.$emit("closeModal", false);
        },

        validateInformation() {
            if (this.information.first_name && this.information.surname) {
                if (this.information.country == 'Colombia' || this.information.country == 'United States') {
                    this.regionName = this.information.country == 'Colombia' ? ".co" : ".us"
                    console.log(this.regionName);
                }
                const createEmail = this.information.first_name + this.information.surname + new Date().getTime() + "@cidenet.com" + this.regionName
                this.information.email = createEmail
            }

            if (this.action == 'create') this.$emit("sendChanges", { information: this.information, type: "create" })
            else this.$emit("sendChanges", { information: this.information, type: "edit" })
        },
        validNameOnlyAZ(id) {
            let input = document.getElementById(id).value;
            // Expresión regular para permitir solo caracteres de la a a la z, tanto en mayúsculas como en minúsculas
            const pattern = /^[a-zA-Z]+$/;
            if (!pattern.test(input)) {
                // Elimina todos los caracteres que no sean de la a a la z
                document.getElementById(id).value = input.replace(/[^a-zA-Z]/g, '');
            }
        },

    },
    mounted() {
        this.information = this.informationModal
        this.country = this.allCountry
        this.information.status = true
    }

}

</script>