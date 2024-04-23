import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import RegionService from './region.service';
import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import { type IRegion, Region } from '@/shared/model/region.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'RegionUpdate',
  setup() {
    const regionService = inject('regionService', () => new RegionService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const region: Ref<IRegion> = ref(new Region());
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveRegion = async regionId => {
      try {
        const res = await regionService().find(regionId);
        region.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.regionId) {
      retrieveRegion(route.params.regionId);
    }

    const validations = useValidation();
    const validationRules = {
      regionName: {},
    };
    const v$ = useVuelidate(validationRules, region as any);
    v$.value.$validate();

    return {
      regionService,
      alertService,
      region,
      previousState,
      isSaving,
      currentLanguage,
      v$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.region.id) {
        this.regionService()
          .update(this.region)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo('A Region is updated with identifier ' + param.id);
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.regionService()
          .create(this.region)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess('A Region is created with identifier ' + param.id);
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
