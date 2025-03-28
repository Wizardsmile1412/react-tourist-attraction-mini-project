export const truncateDescription = (description, maxLength = 100) => {
    return (description.length > maxLength ? description.slice(0, maxLength) + ' ...' : description)
  };