<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="jhipsterSampleApplication830App.employee.home.createOrEditLabel" data-cy="EmployeeCreateUpdateHeading">
          Create or edit a Employee
        </h2>
        <div>
          <div class="form-group" v-if="employee.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="employee.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="employee-firstName">First Name</label>
            <input
              type="text"
              class="form-control"
              name="firstName"
              id="employee-firstName"
              data-cy="firstName"
              :class="{ valid: !v$.firstName.$invalid, invalid: v$.firstName.$invalid }"
              v-model="v$.firstName.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="employee-lastName">Last Name</label>
            <input
              type="text"
              class="form-control"
              name="lastName"
              id="employee-lastName"
              data-cy="lastName"
              :class="{ valid: !v$.lastName.$invalid, invalid: v$.lastName.$invalid }"
              v-model="v$.lastName.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="employee-email">Email</label>
            <input
              type="text"
              class="form-control"
              name="email"
              id="employee-email"
              data-cy="email"
              :class="{ valid: !v$.email.$invalid, invalid: v$.email.$invalid }"
              v-model="v$.email.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="employee-phoneNumber">Phone Number</label>
            <input
              type="text"
              class="form-control"
              name="phoneNumber"
              id="employee-phoneNumber"
              data-cy="phoneNumber"
              :class="{ valid: !v$.phoneNumber.$invalid, invalid: v$.phoneNumber.$invalid }"
              v-model="v$.phoneNumber.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="employee-hireDate">Hire Date</label>
            <div class="d-flex">
              <input
                id="employee-hireDate"
                data-cy="hireDate"
                type="datetime-local"
                class="form-control"
                name="hireDate"
                :class="{ valid: !v$.hireDate.$invalid, invalid: v$.hireDate.$invalid }"
                :value="convertDateTimeFromServer(v$.hireDate.$model)"
                @change="updateInstantField('hireDate', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="employee-salary">Salary</label>
            <input
              type="number"
              class="form-control"
              name="salary"
              id="employee-salary"
              data-cy="salary"
              :class="{ valid: !v$.salary.$invalid, invalid: v$.salary.$invalid }"
              v-model.number="v$.salary.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="employee-commissionPct">Commission Pct</label>
            <input
              type="number"
              class="form-control"
              name="commissionPct"
              id="employee-commissionPct"
              data-cy="commissionPct"
              :class="{ valid: !v$.commissionPct.$invalid, invalid: v$.commissionPct.$invalid }"
              v-model.number="v$.commissionPct.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="employee-manager">Manager</label>
            <select class="form-control" id="employee-manager" data-cy="manager" name="manager" v-model="employee.manager">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="employee.manager && employeeOption.id === employee.manager.id ? employee.manager : employeeOption"
                v-for="employeeOption in employees"
                :key="employeeOption.id"
              >
                {{ employeeOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="employee-department">Department</label>
            <select class="form-control" id="employee-department" data-cy="department" name="department" v-model="employee.department">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  employee.department && departmentOption.id === employee.department.id ? employee.department : departmentOption
                "
                v-for="departmentOption in departments"
                :key="departmentOption.id"
              >
                {{ departmentOption.id }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="v$.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./employee-update.component.ts"></script>
