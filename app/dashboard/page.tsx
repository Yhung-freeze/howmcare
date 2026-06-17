// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabase";

// export default function Dashboard() {
//   const router = useRouter();

//   const [user, setUser] = useState<any>(null);
//   const [profile, setProfile] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   async function checkAuth() {
//     try {
//       // Get session (more reliable than getUser alone)
//       const { data: sessionData } = await supabase.auth.getSession();
//       const session = sessionData?.session;

//       // If no session → redirect to login
//       if (!session?.user) {
//         router.replace("/login");
//         return;
//       }

//       const currentUser = session.user;
//       setUser(currentUser);

//       // Fetch profile from DB
//       const { data: profileData, error } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", currentUser.id)
//         .single();

//       if (!error) {
//         setProfile(profileData);
//       }

//       setLoading(false);
//     } catch (err) {
//       console.error("Auth error:", err);
//       router.replace("/login");
//     }
//   }

//   async function logout() {
//     await supabase.auth.signOut();
//     router.replace("/login");
//   }

//   // Prevent flicker / redirect race condition
//   if (loading) {
//     return (
//       <main style={{ padding: "30px" }}>
//         <p>Loading dashboard...</p>
//       </main>
//     );
//   }

//   return (
//     <main style={{ padding: "30px" }}>
//       <h1>HOW MobileCare Dashboard</h1>

//       <hr />

//       <h2>Welcome {profile?.full_name || "User"}</h2>

//       <p>Role: {profile?.role || "PATIENT"}</p>

//       <p>Email: {user?.email}</p>

//       <hr />

//       <div style={{ display: "flex", gap: "10px" }}>
//         <button>Book Service</button>
//         <button>Appointments</button>
//         <button>Reports</button>
//         <button>Profile</button>
//       </div>

//       <br />

//       <button onClick={logout}>Logout</button>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    setLoading(true);

    const { data: sessionData } = await supabase.auth.getSession();

    const session = sessionData.session;

    if (!session) {
      window.location.href = "/login";
      return;
    }

    const user = session.user;
    setUser(user);

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(profile);
    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  if (loading) {
    return <p style={{ padding: 20 }}>Loading dashboard...</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>HealthOnWheels Dashboard</h1>

      <hr />

      <h2>Welcome {profile?.full_name}</h2>

      <p>Email: {user?.email}</p>
      <p>Role: {profile?.role}</p>

      <hr />

      <button onClick={logout}>Logout</button>
    </div>
  );
}