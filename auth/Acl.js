  // Access control functions
  const isUser = ({ authentication: { item: user } }) => Boolean(user);
  const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
  const userOwnsItem = ({ authentication: { item: user } }) => {
    if (!user) {
      return false;
    }
    return { id: user.id };
  };

  const userIsAdminOrOwner = auth => {
    const isAdmin = userIsAdmin(auth);
    const isOwner = userOwnsItem(auth);
    return isAdmin ? isAdmin : isOwner;
  };

  module.exports = { isUser, userIsAdmin, userOwnsItem, userIsAdminOrOwner };


