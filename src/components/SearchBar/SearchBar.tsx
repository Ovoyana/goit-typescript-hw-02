import { Field, Form, Formik, FormikHelpers, FormikValues } from 'formik';
import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';


type Props = {
  onSearch: (value: string) => void;
}

const SearchBar = ({ onSearch }:Props) => {
  const handleSubmit = (values:FormikValues, actions:FormikHelpers<any>): void => {
    if (values.search.trim() === '') {
      toast.error('Please enter a correct search term!');
      return;
    }
    onSearch(values.search.trim().toLowerCase());
    actions.resetForm();
  };

  return (
    <>
      <header className={css.searchHeader}>
          <Formik className={css.wrapper} initialValues={{ search: '' }} onSubmit={handleSubmit}>
            <Form className={css.form}>
              <Field className={css.search}
                type="text"
                name="search"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
              />
              <button className={css.btn} type="submit">
                Search
              </button>
              <Toaster />
            </Form>
          </Formik>
        </header>
    </>
  );
};

export default SearchBar;