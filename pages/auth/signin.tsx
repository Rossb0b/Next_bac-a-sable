// import * as React from "react";
// import { providers, signin, useSession } from 'next-auth/client'

// const initialFormData = Object.freeze({
//     email: "",
//     password: ""
//   });

// export default function SignIn({ providers, csrfToken }) {
//     delete providers.credentials;
//     const [formData, updateFormData] = React.useState(initialFormData);

//     const handleChange = (e) => {
//         updateFormData({
//             ...formData,
//             [e.target.name]: e.target.value.trim()
//         });
//     };

//     const handleLogin = (e) => async () => {
//         e.preventDefault();
//         console.log("test");
//         const options = {
//             redirect: false,
//             email: formData.email,
//             password: formData.password
//         };
        
//         await signin("credentials", options);
//     }

//     const [session] = useSession()

//   if (session) {
//     return (
//         <div>
//             <p>Response:</p>
//             <pre style={{ background: '#eee', padding: 16 }}>SUCCESS</pre>
//         </div>
//     )
//   }

//     return (
//         <>
//             <form>
//                 <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
//                 <label>
//                     Email
//                     <input name='email' type='text' onChange={handleChange}/>
//                 </label>
//                 <label>
//                     Password
//                     <input name='password' type='password' onChange={handleChange}/>
//                 </label>
//                 <button onClick={handleLogin}>Sign in</button>
//             </form>
//             {Object.values(providers).map(provider => (
//             <div key={provider.name}>
//                 <button onClick={() => signin(provider.id)}>Sign in with {provider.name}</button>
//             </div>
//             ))}
//         </>
//     )
// }

// SignIn.getInitialProps = async () => {
//   return {
//     providers: await providers()
//   }
// }