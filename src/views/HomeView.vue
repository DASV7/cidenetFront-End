<style>
.homeComponent__users {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  grid-gap: 1rem;
}

.homeComponent__creation {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #57b154;
  height: 30px;
  width: 180px;
  border: none;
  text-align: center;
  margin: 10px 0;
  border-radius: 10px;
  color: white;
  cursor: pointer;
}
</style>

<template>
  <div class="homeComponent">

    <div class="homeComponent__filter">
      <FilterEmployee :country="country" @filterInformation="getUsersByFilter($event)" />
    </div>

    <div class="homeComponent__creation" @click="showInformationModal('add')">
      Crear empleado <i class="fa-solid fa-user-plus"></i>
    </div>

    <modalFormEmployeeVue v-if="showModal" :action="actionModal" :informationModal="informationForModal"
      :all-country="country" :show-modal="showModal" @closeModal="actionModals()"
      @sendChanges="createUserInformation($event)" />

    <div class="homeComponent__users">
      <CardEmployee v-for="user in usersData" :key="user + Math.random()" @deleteUser="deleteUserById($event)"
        @openModal="openModalEditUser($event)" :information="user" />
    </div>
  </div>
</template>

<script>

import CardEmployee from '@/components/cardEmployee.vue'
import FilterEmployee from '@/components/filterEmployee.vue'
import modalFormEmployeeVue from '@/components/modalFormEmployee.vue'
import Swal from "sweetalert2";

export default {
  name: 'HomeView',
  components: {
    FilterEmployee,
    CardEmployee,
    modalFormEmployeeVue,
  },
  data() {
    return {
      returnData: "",
      usersData: [],
      showModal: false,
      informationForModal: {},
      actionModal: "",
      url: "http://localhost:3000/api/v1/",
      country: []
    }
  },
  methods: {
    getAllEmployees() {
      fetch(this.url + "users")
        .then(response => response.json())
        .then(data => {
          this.usersData = data.information
        })
        .catch(error => console.log(error, "error"))
    },

    getUsersByFilter(filter) {
      fetch(this.url + "users/filter",
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(filter)
        }).then(e => e.json())
        .then(data => {
          this.usersData = data.information
        })
        .catch(e => {
          Swal.fire({
            text: e.message,
            icon: "error",
            confirmButtonColor: "#0079ff",
          });
        })


    },
    showInformationModal(action) {
      this.showModal = !this.showModal
      this.actionModal = "create"
    },

    actionModals(status) {
      this.showModal = status
      this.informationForModal = {}
      this.actionModal = ""
    },

    deleteUserById(id) {
      Swal.fire({
        title: "¿Esta Seguro?",
        text: "Si elimina el Usuario No se podra Recuperar",
        icon: "info",
        showCancelButton: true,
        iconColor: "#bd0909",
        confirmButtonColor: "#bd0909",
        cancelButtonColor: "#5b5957",
        confirmButtonText: "Sí, Eliminar!",
        cancelButtonText: "Cancelar"
      }).then(async (result) => {
        if (result.isConfirmed) {
          fetch(this.url + "users",
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "DELETE",
              body: JSON.stringify(id)
            })
          this.usersData = this.usersData.filter(e => e._id !== id._id)
        }
      })

    },
    createUserInformation({ information, type }) {
      if (type == 'create') {
        fetch(this.url + "users/create",
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "post",
            body: JSON.stringify(information)
          }).then(e => e.json())
          .then(data => {
            if (data.error) throw new Error(data.message)
            Swal.fire({
              text: "Se ha Actualizado el usuario Correctamente",
              icon: "success",
              confirmButtonColor: "#0079ff",
            });
            this.usersData.push(data.information)
            this.actionModals(false)
          })
          .catch(e => {
            Swal.fire({
              text: e.message,
              icon: "error",
              confirmButtonColor: "#0079ff",
            });
          })
      }
      if (type === 'edit') {
        this.updateProfileEmployee(information)
      }

    },
    updateProfileEmployee(info) {
      fetch(this.url + "users",
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "post",
          body: JSON.stringify(info)
        }).then(e => e.json())
        .then(data => {
          if (data.error) throw new Error(data.message)
          Swal.fire({
            text: "Se ha Editado el usuario Correctamente",
            icon: "success",
            confirmButtonColor: "#0079ff",
          })
          const index = this.usersData.findIndex(e => e._id == data.information._id)
          this.usersData[index] = data.information
          this.actionModals(false)
        }).catch(e => {
          Swal.fire({
            text: e.message,
            icon: "error",
            confirmButtonColor: "#0079ff",
          });
        })
    },

    openModalEditUser(user) {
      this.showModal = true
      this.informationForModal = user
      this.actionModal = "edit"
    },
    getCountryApiPublic() {
      fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
          this.country = data.map(e => e.name.common)
        })
        .catch(error => console.log(error));
    }

  },

  mounted() {
    this.getAllEmployees()
    this.getCountryApiPublic()
  }
}
</script>
