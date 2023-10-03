type DeletePageProps = {
  params: {
    id: string;
  };
};

export default function DeletePage({ params }: DeletePageProps) {
  return (
    <div>
      <h1>{`Delete ${params.id} Placeholder`}</h1>
    </div>
  );
}
