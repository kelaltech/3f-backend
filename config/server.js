module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: 'a86b9aa8-43ce-4c17-9308-d8981d3fda3a'
    }
  }
});
