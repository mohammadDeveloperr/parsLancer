<template>
    <b-container fluid class="footer mt-4 py-4" dir="rtl">
        <b-row>
            <b-col md="4" class="mb-3 text-right">
                <h5> با پارسلنسر</h5>
                <b-col md="4" class="mb-3 text-right">
                    <router-link class="link" to="/about">
                        درباره ما
                    </router-link>
                    <br>
                    <router-link class="link" to="/contact">
                        تماس با ما
                    </router-link>
                </b-col>


            </b-col>
            <b-col md="4" class="mb-3 text-right">
                <h5>لینک ها</h5>
                <ul class="list-unstyled">
                    <router-link class="link" to="/">
                        خانه
                    </router-link>
                    <br>
                    <router-link class="link" to="/project">
                        پروژه ها
                    </router-link>
                    <br>
                    <router-link class="link" to="/user">
                        فریلنسر ها
                    </router-link>

                </ul>
            </b-col>

            <b-col md="4" class="mb-3 text-right">
                <h5>مارا دنبال کنید</h5>
                <br>
                <div>
                    <b-button variant="primary" class="mr-2" href="https://www.facebook.com"><i
                            class="fab fa-facebook-f"></i></b-button>
                    <b-button variant="info" class="mr-2" href="https://www.twitter.com"><i
                            class="fab fa-twitter"></i></b-button>
                    <b-button variant="danger" class="mr-2" href="https://www.instagram.com"><i
                            class="fab fa-instagram"></i></b-button>
                    <b-button variant="primary" class="mr-2" href="https://telegram.org"><i
                            class="fab fa-telegram-plane"></i></b-button>
                    <b-button variant="secondary" href="https://www.linkedin.com" class="mr-2"><i
                            class="fab fa-linkedin"></i></b-button>
                </div>
            </b-col>
        </b-row>
        <b-row class="text-center mt-4">
            <b-col>
                <p class="text-muted">تمام حقوق متعلق به پارسلنسر است.©</p>
            </b-col>
        </b-row>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    </b-container>
    
</template>

<script>
/* eslint-disable */
export default {
    name: 'Footer'
};
</script>

<style scoped>
.link {
    font-size: large;
}

.footer {
    background-color: #f8f9fa;
    border-top: 1px solid #e7e7e7;
}

.footer h5 {
    margin-bottom: 1rem;
}

.footer p {
    margin-bottom: 0;
}

.footer .list-unstyled {
    padding-left: 0;
    list-style: none;
}

.footer .list-unstyled li {
    margin-bottom: 0.5rem;
}

.footer .fab {
    font-size: 1.25rem;
}
</style>