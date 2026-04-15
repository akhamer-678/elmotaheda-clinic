const supabaseUrl = "https://rfwylqnkkaxaapinapaz.supabase.co";
const supabaseKey = "sb_publishable_xfBrhWGol1KRKURhE_5a6w_Mm6iSLUj";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const email = `${username}@system.local`;

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("بيانات غلط ❌");
    return;
  }

  const userId = data.user.id;

  const { data: profile } = await supabaseClient
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  localStorage.setItem("user", JSON.stringify(profile));

  if (profile.role === "reciption") {
    window.location.href = "reciption.html";
  } else if (profile.role === "admin") {
    window.location.href = "admin.html";
  }
});
