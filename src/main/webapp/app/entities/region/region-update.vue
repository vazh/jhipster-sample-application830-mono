<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="jhipsterSampleApplication830App.region.home.createOrEditLabel" data-cy="RegionCreateUpdateHeading">
          Create or edit a Region
        </h2>
        <div>
          <div class="form-group" v-if="region.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="region.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="region-regionName">Region Name</label>
            <input
              type="text"
              class="form-control"
              name="regionName"
              id="region-regionName"
              data-cy="regionName"
              :class="{ valid: !v$.regionName.$invalid, invalid: v$.regionName.$invalid }"
              v-model="v$.regionName.$model"
            />
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
<script lang="ts" src="./region-update.component.ts"></script>
