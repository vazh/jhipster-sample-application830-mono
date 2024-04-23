<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="jhipsterSampleApplication830App.location.home.createOrEditLabel" data-cy="LocationCreateUpdateHeading">
          Create or edit a Location
        </h2>
        <div>
          <div class="form-group" v-if="location.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="location.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="location-streetAddress">Street Address</label>
            <input
              type="text"
              class="form-control"
              name="streetAddress"
              id="location-streetAddress"
              data-cy="streetAddress"
              :class="{ valid: !v$.streetAddress.$invalid, invalid: v$.streetAddress.$invalid }"
              v-model="v$.streetAddress.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="location-postalCode">Postal Code</label>
            <input
              type="text"
              class="form-control"
              name="postalCode"
              id="location-postalCode"
              data-cy="postalCode"
              :class="{ valid: !v$.postalCode.$invalid, invalid: v$.postalCode.$invalid }"
              v-model="v$.postalCode.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="location-city">City</label>
            <input
              type="text"
              class="form-control"
              name="city"
              id="location-city"
              data-cy="city"
              :class="{ valid: !v$.city.$invalid, invalid: v$.city.$invalid }"
              v-model="v$.city.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="location-stateProvince">State Province</label>
            <input
              type="text"
              class="form-control"
              name="stateProvince"
              id="location-stateProvince"
              data-cy="stateProvince"
              :class="{ valid: !v$.stateProvince.$invalid, invalid: v$.stateProvince.$invalid }"
              v-model="v$.stateProvince.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="location-country">Country</label>
            <select class="form-control" id="location-country" data-cy="country" name="country" v-model="location.country">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="location.country && countryOption.id === location.country.id ? location.country : countryOption"
                v-for="countryOption in countries"
                :key="countryOption.id"
              >
                {{ countryOption.id }}
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
<script lang="ts" src="./location-update.component.ts"></script>
