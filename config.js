// Configuração do Conecta Cruzeiro (piloto)
// A chave abaixo é a "publishable" (pública). NUNCA coloque aqui a chave secret/service_role.
window.CONECTA_CONFIG = {
  supabaseUrl: "https://nvumbwyqtvpzimpdueax.supabase.co",
  supabaseKey: "sb_publishable_1-UUSq8GngYmLfs1f5rwxQ_5c_XCpRf",
  // Domínio interno usado para transformar a matrícula em login (ninguém recebe e-mail nele).
  dominioLogin: "conecta.farmaciascruzeiro.com.br",
  // Usuário administrador (RH) do piloto
  usuarioAdmin: "admin"
};

// Funções comuns às telas
(function () {
  const C = window.CONECTA_CONFIG;
  // Matrícula: só números, sem zeros à esquerda (assim "0123" e "123" são a mesma pessoa)
  C.normalizarMatricula = function (valor) {
    const v = String(valor || "").trim().toLowerCase();
    if (v === C.usuarioAdmin) return v;
    const so = v.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
    return so;
  };
  C.emailDaMatricula = function (mat) { return mat + "@" + C.dominioLogin; };
  C.cliente = function () {
    if (!C._sb) {
      C._sb = window.supabase.createClient(C.supabaseUrl, C.supabaseKey, {
        auth: { persistSession: true, autoRefreshToken: true, storageKey: "conecta-cruzeiro-auth" }
      });
    }
    return C._sb;
  };
})();
