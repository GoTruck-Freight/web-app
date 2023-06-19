<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="auto">
            <v-card>
                <v-card-text>
                    an unknown error occurred
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    props: {
    status: {
      type: Boolean,
      required: true
    }
  },
    data() {
        return {
            dialog: false,
        }
    },
    watch: {
    status(newStatus) {
      // initialMessage propu izleme
      this.dialog = newStatus;
    }
  },
}
</script>