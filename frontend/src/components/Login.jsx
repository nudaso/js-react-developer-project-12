import { Formik, Form, Field, ErrorMessage,  } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useState } from "react";

function Login () {
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const [loginError, setLoginError] = useState(false);
  return (
    <Formik
      initialValues={ {username:"", password:""} }
      validationSchema={Yup.object({
        username: Yup.string()
          .required('Required'),
        password: Yup.string().required('Required'),
      })}
      onSubmit={async (values, acitions) => {
        try {
          const response = await fetch("/api/v1/login", {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            }
          })
          const data = await response.json();
          if (response.ok) {
            logIn(data);
            navigate("/", { replace: true });
          } else {
            throw new Error("pizda");
          }
        } catch (error) {
          setLoginError(true);
        } finally {
          acitions.setSubmitting(false);
        }
      }}
    >
      <Form>
         <label htmlFor="username">login</label>
         <Field name="username" type="text" placeholder="login"/>
         <ErrorMessage name="username" />
 
         <label htmlFor="password">password</label>
         <Field name="password" type="password" placeholder="password"/>
         <ErrorMessage name="password" />
         {loginError ? <p>error login</p> : null}
         <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}

export default Login;