import Spinner from "@/components/UI/Spinner";

export default function HomePageLoader() {
  return (
    <div style={{ width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
      <Spinner />
    </div>
  );
}