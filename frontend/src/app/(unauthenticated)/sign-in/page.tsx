import { PageTitle } from '@/components/common/PageTitle';
import { SLSignInFormCard } from '@/components/domain/(unauthenticated)/SLSignInFormCard';
import { useSignInForm } from '@/hooks/domain/(unauthenticated)/useSignInForm';
import { getEnv } from '@/lib/getEnv';

const serviceName = getEnv('SERVICE_NAME') || 'サービス名未設定';
const isUseMSW = getEnv('USE_MSW');

const dummyPassword = isUseMSW ? 'password1234' : '';

console.log('isUseMSW', isUseMSW);
export const SignInPage: React.FC = () => {
  const signInFormProps = useSignInForm();
  return (
    <>
      <PageTitle title="ログイン" />
      <SLSignInFormCard
        control={signInFormProps.control}
        errors={signInFormProps.errors}
        handleSubmit={signInFormProps.submitForm}
        isShowPassword={signInFormProps.isShowPassword}
        isSubmitting={signInFormProps.isSubmitting}
        logoSrcDark="/AdminTemplateLogo-dark.png"
        logoSrcLight="/AdminTemplateLogo-light.png"
        signInErrorMessage={signInFormProps.signInErrorMessage}
        title={serviceName}
        toggleShowPassword={signInFormProps.toggleShowPassword}
      />
      {!!isUseMSW && !!signInFormProps.signInErrorMessage && (
        <p style={{ fontSize: '0.8rem', color: '#666', textAlign: 'center' }}>
          MSWを使用している場合、
          <br />
          下記をパスワードに入れるとログインできます。
          <br />
          <strong>{dummyPassword}</strong>
        </p>
      )}
    </>
  );
};
