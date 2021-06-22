import { useRouter } from "next/router";
import * as React from "react";
import { AppContext } from "../providers/AppProvider";
import { FirebaseContext } from "../providers/FirebaseProvider";
import { Maybe } from "../types";
import { Button } from "./Button";
import { Link } from "./Tiles/Link";

export const Controls: React.FC = () => {
  const router = useRouter()
  const { auth, firestore, user } = React.useContext(FirebaseContext);
  const { editing, setEditing, rows } = React.useContext(AppContext);

  const handleEditButton = React.useCallback(async () => {
    if (firestore) {
      if (editing) {
        if (user) {
          const userDoc = firestore.doc(`users/${user.uid}`);
          const batch = firestore.batch();
          batch.set(userDoc, {
            rows
          });
          await batch.commit();
        } else {
          router.push("/signup")
        }
      }
    }
    setEditing?.((prev) => !prev);
  }, [editing]);

  return (
    <div
      className="fixed bottom-0 right-0 pr-2 pb-2 flex"
    >
      {user ? (
        <Button onClick={() => auth?.signOut()}
        >
          Logout
        </Button>
      ) : (
        <Button href="/signup"
        >
          Sign up
        </Button>
      )}
      
      <Button
        className={`ml-2`}
        onClick={() => handleEditButton()}
        active={editing}
      >
        {editing ? "Save" : "Customise"}
      </Button>
    </div>
  )
}