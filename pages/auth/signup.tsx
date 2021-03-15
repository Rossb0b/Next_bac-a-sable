import { useForm } from "react-hook-form";
import  { useRouter } from "next/router";
import { signIn } from "next-auth/client";

import { fetchPostJSON } from "utils/api-helpers";

interface Data {
    firtname: String,
    lastname: String,
    email: String,
    password: String
}

export default function Signup() {
    const router = useRouter();
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = async (data: Data) => {
        const response = await fetchPostJSON("/api/auth/signup", data);

        if (response.statusCode === 500) {
            console.error(response.message);
            return;
        }

        if (response.statusCode === 200) {
            await signIn("credentials", {
                email: data.email,
                password: data.password,
                callbackUrl: "http://localhost:3000/"
            });
            router.push("/");
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <span>
                        Firstname
                    </span>
                    :
                    <input name="firstname" type="text" id="firstname" ref={register({ required: true })} />
                    {errors.firstname && <span className="error_field">Firstname is required</span>}
                </label>

                <label>
                    <span>
                        Lastname
                    </span>
                    :
                    <input name="lastname" type="text" ref={register({ required: true })} />
                    {errors.lastname && <span className="error_field">Lastname is required</span>}
                </label>

                <label>
                    <span>
                        Email
                    </span>
                    :
                    <input name="email" type="email" ref={register({ required: true})} />
                    {errors.email && <span className="error_field">Email is required</span>}
                </label>

                <label>
                    <span>
                        Password
                    </span>
                    :
                    <input name="password" type="password" ref={register({ required: true })} />
                    {errors.password && <span className="error_field">Password is required</span>}
                </label>

                <input id="submit" type="submit" />
            </form>
        <style jsx>{`
            .container {
                margin: auto;
                min-width: 300px;
                max-width: 350px;
                width: 80%;
            }

						.error_field {
							font-weight: bold;
						}

            form {
                display: flex;
                flex-direction: column;
            }

            label {
                margin: auto;
            }

            label, #submit {
                margin-top: 8px;
            }

            label span {
                display: inline-block;
                min-width: 80px; 
            }

            label input {
                margin-left: 15px;
            }
        `}</style>
        </div>
    );
}