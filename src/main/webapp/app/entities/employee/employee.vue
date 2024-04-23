<template>
  <div>
    <h2 id="page-heading" data-cy="EmployeeHeading">
      <span id="employee-heading">Employees</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh list</span>
        </button>
        <router-link :to="{ name: 'EmployeeCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-employee"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span>Create a new Employee</span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && employees && employees.length === 0">
      <span>No Employees found</span>
    </div>
    <div class="table-responsive" v-if="employees && employees.length > 0">
      <table class="table table-striped" aria-describedby="employees">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('firstName')">
              <span>First Name</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'firstName'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('lastName')">
              <span>Last Name</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'lastName'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('email')">
              <span>Email</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'email'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('phoneNumber')">
              <span>Phone Number</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'phoneNumber'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('hireDate')">
              <span>Hire Date</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'hireDate'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('salary')">
              <span>Salary</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'salary'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('commissionPct')">
              <span>Commission Pct</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'commissionPct'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('manager.id')">
              <span>Manager</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'manager.id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('department.id')">
              <span>Department</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'department.id'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'EmployeeView', params: { employeeId: employee.id } }">{{ employee.id }}</router-link>
            </td>
            <td>{{ employee.firstName }}</td>
            <td>{{ employee.lastName }}</td>
            <td>{{ employee.email }}</td>
            <td>{{ employee.phoneNumber }}</td>
            <td>{{ formatDateShort(employee.hireDate) || '' }}</td>
            <td>{{ employee.salary }}</td>
            <td>{{ employee.commissionPct }}</td>
            <td>
              <div v-if="employee.manager">
                <router-link :to="{ name: 'EmployeeView', params: { employeeId: employee.manager.id } }">{{
                  employee.manager.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="employee.department">
                <router-link :to="{ name: 'DepartmentView', params: { departmentId: employee.department.id } }">{{
                  employee.department.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'EmployeeView', params: { employeeId: employee.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'EmployeeEdit', params: { employeeId: employee.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(employee)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <template #modal-title>
        <span id="jhipsterSampleApplication830App.employee.delete.question" data-cy="employeeDeleteDialogHeading"
          >Confirm delete operation</span
        >
      </template>
      <div class="modal-body">
        <p id="jhi-delete-employee-heading">Are you sure you want to delete Employee {{ removeId }}?</p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-employee"
            data-cy="entityConfirmDeleteButton"
            v-on:click="removeEmployee()"
          >
            Delete
          </button>
        </div>
      </template>
    </b-modal>
    <div v-show="employees && employees.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./employee.component.ts"></script>
