export const User = ({user}) => {
  return (
    <div style={{display: 'flex', gap: 8}}>
      <p>{user?.name}</p>
      <p>{user?.blogs?.length}</p>
    </div>
  );
};
