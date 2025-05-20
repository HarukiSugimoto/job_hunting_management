import { Link } from 'react-router-dom';
import { SLPageContainer } from '@/sakura-like-ui/components/mui/SLPageContainer';

export const RootPage: React.FC = () => (
  <SLPageContainer title="Root Page">
    <ul>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
    </ul>
  </SLPageContainer>
);
