import { useLocation } from "react-router-dom";

export default function SubscriptionSuccess() {
  const query = new URLSearchParams(useLocation().search);
  const sessionId = query.get("session_id");

  return (
    <div className="container">
      <h1>Paiement réussi 🎉</h1>
      <p>Merci pour votre abonnement !</p>
      {sessionId && <p>ID de session : {sessionId}</p>}
      <a href="/articles">Accéder aux articles premium</a>
    </div>
  );
}