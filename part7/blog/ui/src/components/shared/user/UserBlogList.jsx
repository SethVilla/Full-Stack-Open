import {useParams} from 'react-router-dom';

export const UserBlogList = () => {
  const userId = useParams()?.id;
  console.log(userId);
  return <ul>

  </ul>;
};