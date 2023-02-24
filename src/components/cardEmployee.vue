<style>
.cardUser {
    width: 230px;
    height: 230px;
    border: 1px solid #000;
    border-radius: 10px;
}

.cardUser__img {}

.cardUser__img-item {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid #ccc;
}

.cardUser__name {
    font-size: 1rem;
    font-weight: bold;
    color: #000;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
}

.flex {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
    height: 30px;
}

.cardUser__actions-add {
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.cardUser__actions-delete {
    background-color: rgb(211, 0, 0);
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;

}

.cardUser__date {
    font-size: 10px;
}
</style>

<template>
    <div class="cardUser">
        <div class="cardUser__img">
            <img class="cardUser__img-item" src="https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png">
        </div>
        <div class="cardUser__name">{{ information?.first_name }} {{ information?.surname }}</div>
        <div class="cardUser__actions flex">
            <button class="cardUser__actions-add flex" @click="editUser()">
                <p>Editar</p>
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button @click="deleteCardUser()" class="cardUser__actions-delete flex">
                <p>Eliminar</p>
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        <u class="cardUser__date">Fecha de ingreso:{{ information.date_register }}</u>
    </div>
</template>

<script>
export default {
    name: 'cardEmployee',
    props: ["information"],
    data() {
        return {
        }
    },
    methods: {
        deleteCardUser() {
            this.$emit("deleteUser", { _id: this.information._id })
        },
        editUser() {
            this.$emit("openModal", this.information)
        }
    }

}
</script>