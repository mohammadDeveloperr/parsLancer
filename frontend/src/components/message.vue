<template>
    <div class="messaging-page " dir="rtl">
        <div class="chat-container">
            <div class="chat-header">
                <h3>پیام ها</h3>
            </div>
            <div class="chat-messages text-right" dir="rtl">
                <div v-for="(message, index) in messages.messages" :key="index"
                    :class="['message', messages.employer_username === message.owner ? 'message-employer' : 'message-freelancer']">
                    <div class="message-sender">{{ message.owner }}</div>
                    <div class="message-content">{{ message.message }}</div>
                </div>
            </div>
            <div class="chat-input">
                <b-form @submit.prevent="addMessage">
                    <b-input-group dir="rtl">
                        <b-input-group-append>
                            <b-button type="submit" variant="primary">ارسال</b-button>
                        </b-input-group-append>
                        <b-form-input v-model="newMessage" placeholder="پیام خود را بنویسید..."
                            required></b-form-input>

                    </b-input-group>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import Cookies from 'js-cookie';
import axios from 'axios'
import { getSession } from '../utils/sessionUtils'

export default {
    name: 'message',
    data() {
        return {
            token: Cookies.get('token'),
            messages: [
                { sender: 'employer', content: 'Hello, can you help me with my project?' },
                { sender: 'freelancer', content: 'Sure, I would love to!' },
                // Add more initial messages if needed
            ],
            newMessage: ''
        };
    },
    methods: {
        makeToast(variant = null, message) {
            this.$bvToast.toast(message, {
                title: ``,
                variant: variant,
                solid: true
            })
        },
        sendMessage() {
            if (this.newMessage.trim() !== '') {
                this.messages.push({
                    sender: 'employer', // Change to 'freelancer' if needed
                    content: this.newMessage.trim()
                });
                this.newMessage = '';
            }
        },
        async getMessages() {
            {
                try {
                    this.suggestId = this.$route.params.suggestId
                    let config = {
                        method: 'GET',
                        maxBodyLength: Infinity,
                        url: `http://localhost:3000/message/${this.suggestId}`,
                        headers: { token: this.token }
                    };


                    const response = await axios.request(config)


                    this.messages = response.data.messages[0]
                    console.log('messages')
                    console.log(response)
                } catch (err) {
                    console.log('this is error')
                    console.log(err)
                    this.messages = []
                }
            }
        },
        async addMessage() {
            try {

                this.newMessage = this.newMessage.trim()
                console.log('this is new message')
                console.log(this.newMessage)


                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `http://localhost:3000/message/${this.messages.id}`,
                    headers: { token: this.token },
                    data: { message: this.newMessage }
                };



                const response = await axios.request(config)

                console.log('response is')
                console.log(response)
                this.messages.messages.push({
                    message: this.newMessage, // Change to 'freelancer' if needed
                    owner: this.user.username
                });
                this.newMessage = '';
            } catch (error) {

                this.makeToast("danger", "ارسال پیام با مشکل مواجه شد")

            }


        }
    },
    created() {
        this.user = getSession(this.token)
        this.getMessages()
    }
};
</script>

<style scoped>
.messaging-page {

    display: flex;
    justify-content: center;
    padding: 20px;
    background-color: #f0f2f5;
    height: 110vh;
}

.chat-container {
    margin: 5% 0;
    width: 100%;
    max-width: 600px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.chat-header {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.chat-messages {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    background-color: #fafafa;
}

.message {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    width: fit-content;
    max-width: 70%;
}

.message-employer {
    background-color: #e1f5fe;
    align-self: flex-start;
}

.message-freelancer {
    background-color: #c8e6c9;
    align-self: flex-end;
}

.message-sender {
    font-weight: bold;
    margin-bottom: 5px;
}

.chat-input {
    padding: 10px;
    border-top: 1px solid #ddd;
    background-color: #fff;
}

.chat-input form {
    display: flex;
}

.chat-input input {
    flex: 1;
}
</style>