import { Form, useNavigation, redirect } from 'react-router-dom';
import { FormRows,FormRowsSelect } from '../components';
import { useOutletContext } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constatnt';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import Wrapper from '../wrappers/DashboardFormpage';


const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>add job</h4>
        <div className='form-center'>
          <FormRows type='text' name='position' />
          <FormRows type='text' name='company' />
          <FormRows
            type='text'
            labelText='job location'
            name='jobLocation'
            defaultValue={user.location}
          />

          <FormRowsSelect
            name='jobStatus'
            labelText='job status'
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)} />
          <FormRowsSelect
            name='jobType'
            labelText='job type'
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)} />
          <button
            type='submit'
            className='btn btn-block form-btn '
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;