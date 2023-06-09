import Handlebars from 'handlebars';

export default {
  isSelected: (role, expectedRole) => (role === expectedRole ? 'selected' : ''),
  
};
