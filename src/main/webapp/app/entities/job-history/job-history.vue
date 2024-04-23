<template>
  <div>
    <h2 id="page-heading" data-cy="JobHistoryHeading">
      <span id="job-history-heading">Job Histories</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh list</span>
        </button>
        <router-link :to="{ name: 'JobHistoryCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-job-history"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span>Create a new Job History</span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && jobHistories && jobHistories.length === 0">
      <span>No Job Histories found</span>
    </div>
    <div class="table-responsive" v-if="jobHistories && jobHistories.length > 0">
      <table class="table table-striped" aria-describedby="jobHistories">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('startDate')">
              <span>Start Date</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'startDate'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('endDate')">
              <span>End Date</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'endDate'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('language')">
              <span>Language</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'language'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('job.id')">
              <span>Job</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'job.id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('department.id')">
              <span>Department</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'department.id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('employee.id')">
              <span>Employee</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'employee.id'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="jobHistory in jobHistories" :key="jobHistory.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'JobHistoryView', params: { jobHistoryId: jobHistory.id } }">{{ jobHistory.id }}</router-link>
            </td>
            <td>{{ formatDateShort(jobHistory.startDate) || '' }}</td>
            <td>{{ formatDateShort(jobHistory.endDate) || '' }}</td>
            <td>{{ jobHistory.language }}</td>
            <td>
              <div v-if="jobHistory.job">
                <router-link :to="{ name: 'JobView', params: { jobId: jobHistory.job.id } }">{{ jobHistory.job.id }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="jobHistory.department">
                <router-link :to="{ name: 'DepartmentView', params: { departmentId: jobHistory.department.id } }">{{
                  jobHistory.department.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="jobHistory.employee">
                <router-link :to="{ name: 'EmployeeView', params: { employeeId: jobHistory.employee.id } }">{{
                  jobHistory.employee.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'JobHistoryView', params: { jobHistoryId: jobHistory.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'JobHistoryEdit', params: { jobHistoryId: jobHistory.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(jobHistory)"
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
        <span id="jhipsterSampleApplication830App.jobHistory.delete.question" data-cy="jobHistoryDeleteDialogHeading"
          >Confirm delete operation</span
        >
      </template>
      <div class="modal-body">
        <p id="jhi-delete-jobHistory-heading">Are you sure you want to delete Job History {{ removeId }}?</p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-jobHistory"
            data-cy="entityConfirmDeleteButton"
            v-on:click="removeJobHistory()"
          >
            Delete
          </button>
        </div>
      </template>
    </b-modal>
    <div v-show="jobHistories && jobHistories.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./job-history.component.ts"></script>
