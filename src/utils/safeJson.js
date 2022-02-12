export default async function safeJsonParse(item) {
  try {
    const pharsed = await JSON.parse(item);
    return pharsed;
  } catch (err) {
    return err;
  }
}
