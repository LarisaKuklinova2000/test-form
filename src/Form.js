import { Formik, Form, Field, ErrorMessage, useField } from "formik"
import * as Yup from 'yup'

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props)

    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field}/>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ): null}
        </>
    )
}

const MyCheckbox = ({children, ...props}) => {
    const [field, meta] = useField({...props, type: 'checkbox'})

    return (
        <>
            <label className="checkbox">
                <input type='checkbox' {...props} {...field}/>
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ): null}
        </>
    )
}

const SubmitForm = () => {

    return (
        <Formik
            initialValues = {
                {name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false}
            }
            validationSchema = {Yup.object({
            name: Yup.string()
                    .min(2, 'минимум 2 символа')
                    .required('поле имя обязательно'),
            email: Yup.string()
                    .email('неверно введена почта')
                    .required('полеп почты обязательно'),
            amount: Yup.number()
                    .min(5, 'не менее 5'),
            currency: Yup.string().required('выберите валюту'),
            text: Yup.string().min(10, 'не менее 10 символов'),
            terms: Yup.boolean()
                    .required('необходимо согласие')
                    .oneOf([true], 'необходимо согласие')
            })}
            onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
        >
            <Form className="form">
                <h2>Отправить пожертвование</h2>
                <MyTextInput
                    label='Ваше имя'
                    id="name"
                    name="name"
                    type="text"
                />

                <MyTextInput 
                    label='Ваша почта'
                    id="email"
                    name="email"
                    type="email"
                />

                <MyTextInput
                    label='Количество'
                    id="amount"
                    name="amount"
                    type="number"
                />

                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as='select'
                >
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage className="error" name='currency' component='div'/>
                <label htmlFor="text">Ваше сообщение</label>
                <Field
                    id="text"
                    name="text"
                    as='textarea'
                />
                <ErrorMessage className="error" name='text' component='div'/>

                <MyCheckbox name='terms'>Соглашаетесь с политикой конфиденциальности?</MyCheckbox>
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}

export default SubmitForm;