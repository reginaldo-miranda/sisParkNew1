/*import "../Servicos/servicos.css"

export default function Servicos(){
  return (
    <>
      <h2 className="titulo-serv">Servicos</h2>
      <div className="ser-container">
        <div>
          <div>
            <label>Descricao do serviço</label>
          </div>
           <input type="text" id="" className="descricao" />
           
           <input type="text" id="" className="valor" />
        </div>
               
      </div>
      <div >
        <button className="botao">cadastrar</button>
      </div>
    </>
  );
}
*/

import React, { useState, useEffect } from "react";
import "../Servicos/servicos.css";

const API_URL = "http://localhost:3000/servicos";

export default function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [form, setForm] = useState({ descricao: "", valor: "" });
  const [editandoId, setEditandoId] = useState(null);

  // Carrega lista
  async function fetchServicos() {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setServicos(Array.isArray(data) ? data : []);
    } catch (error) {
      alert("Erro ao carregar serviços: " + error.message);
    }
  }

  useEffect(() => {
    fetchServicos();
  }, []);

  // Cadastrar ou atualizar
  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      descricao: form.descricao,
      valor: parseFloat(form.valor),
    };

    try {
      if (editandoId) {
        // Atualiza
        const res = await fetch(`${API_URL}/${editandoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Erro ao atualizar serviço");
      } else {
        // Cadastra
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Erro ao cadastrar serviço");
      }

      setForm({ descricao: "", valor: "" });
      setEditandoId(null);
      fetchServicos();
    } catch (error) {
      alert(error.message);
    }
  }

  // Editar
  function handleEditar(servico) {
    setForm({ descricao: servico.descricao, valor: String(servico.valor) });
    setEditandoId(servico.id);
  }

  // Excluir
  async function handleExcluir(id) {
    if (!window.confirm("Deseja excluir este serviço?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao excluir serviço");
      fetchServicos();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <h2 className="titulo-serv">Serviços</h2>
      <div className="ser-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Descrição do serviço</label>
            <input
              type="text"
              className="descricao"
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              required
            />
          </div>

          <div>
            <label>Valor (R$)</label>
            <input
              type="number"
              className="valor"
              value={form.valor}
              onChange={(e) => setForm({ ...form, valor: e.target.value })}
              required
            />
          </div>

          <button className="botao" type="submit">
            {editandoId ? "Atualizar" : "Cadastrar"}
          </button>

          {editandoId && (
            <button
              type="button"
              className="botao"
              style={{ backgroundColor: "gray", marginLeft: 10 }}
              onClick={() => {
                setEditandoId(null);
                setForm({ descricao: "", valor: "" });
              }}
            >
              Cancelar
            </button>
          )}
        </form>
      </div>

      <hr style={{ margin: "20px 0" }} />

      <h3>Serviços Cadastrados</h3>
      <ul>
        {servicos.map((s) => (
          <li key={s.id} style={{ marginBottom: 10 }}>
            <b>{s.descricao}</b> - R$ {Number(s.valor).toFixed(2)}
            <button
              onClick={() => handleEditar(s)}
              style={{ marginLeft: 10 }}
            >
              Editar
            </button>
            <button
              onClick={() => handleExcluir(s.id)}
              style={{ marginLeft: 5, backgroundColor: "red", color: "white" }}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
