import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/schools")
      .then(res => res.json())
      .then(setSchools);
  }, []);

  const filteredSchools = schools.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.address.toLowerCase().includes(search.toLowerCase()) ||
    s.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main style={{ padding: "20px", fontFamily: "Poppins, sans-serif" }}>
      <h1 style={{
        textAlign: "center",
        color: "#2563eb",
        marginBottom: "25px",
        fontSize: "2.5rem",
        fontWeight: "700"
      }}>
        Schools List
      </h1>

      {/* Search box */}
      <div style={{ margin: "20px 0", maxWidth: "500px", marginLeft: "auto", marginRight: "auto" }}>
        <input
          type="text"
          placeholder="Search by name, address or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem"
          }}
        />
      </div>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "20px"
      }}>
        {filteredSchools.map(s => (
          <div key={s.id} style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "15px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            transition: "transform 0.2s, box-shadow 0.2s"
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.1)";
            }}
          >
            <img src={s.image} alt={s.name} style={{
              width: "100%",
              height: "140px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "12px"
            }} />
            <h2 style={{ fontSize: "1.2rem", fontWeight: "600", color: "#111", marginBottom: "6px" }}>{s.name}</h2>
            <p style={{ margin: "2px 0", color: "#555" }}>{s.address}</p>
            <p style={{ margin: "2px 0", color: "#555", fontWeight: "500" }}>{s.city}</p>
          </div>
        ))}
      </div>

      {/* Back button */}
      <div style={{ textAlign: "center", marginTop: "35px" }}>
        <button
          onClick={() => router.back()}
          style={{
            padding: "12px 20px",
            background: "#2563eb",
            color: "white",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>
    </main>
  );
}
