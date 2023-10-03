type UpdatePageProps = {
  params: {
    id: string;
  };
};

export default function UpdatePage({ params }: UpdatePageProps) {
  return (
    <div>
      <h1>{`Update ${params.id} Placeholder`}</h1>
    </div>
  );
}
