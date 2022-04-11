import * as bcrypt from 'bcrypt';


export const compareHash = async (value: string, hash:string): Promise<boolean> => {
    return bcrypt.compare(value, hash)
}

export const generateHash = async (value: string): Promise<string> => {
    const salt = await bcrypt.genSalt()
    const hash = bcrypt.hash(value, salt)
    return hash
  }