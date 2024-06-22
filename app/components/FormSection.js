const FormSection = ({ title, children }) => (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      {children}
    </div>
  );
  
  export default FormSection;
  